package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.ProjekcijaDAO;
import baza.SalaDAO;
import baza.TipProjekcijeDAO;
import model.Film;
import model.Projekcija;
import model.Sala;
import model.TipProjekcije;

public class ProjekcijeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		List<Film> filmovi = FilmDAO.getAll();
		List<Sala> sale = SalaDAO.getAll();
		List<TipProjekcije> tipoviProjekcije = TipProjekcijeDAO.getAll();
		List<Projekcija> projekcije = ProjekcijaDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("tipovi", tipoviProjekcije);
		data.put("sale", sale);
		data.put("filmovi", filmovi);
		data.put("projekcije", projekcije);

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);

	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
